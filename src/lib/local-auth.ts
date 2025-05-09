import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

// 사용자 데이터를 저장할 파일 경로 (로컬 개발용)
const USERS_FILE_PATH = path.join(process.cwd(), 'local-users.json');

// 사용자 데이터 타입 정의
export interface LocalUser {
  id: string;
  name: string;
  password: string;
  email?: string;
  created_at: string;
}

// 초기 파일 생성 (없는 경우)
function ensureUsersFile() {
  if (!fs.existsSync(USERS_FILE_PATH)) {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify({ users: [] }), 'utf8');
  }
}

// 사용자 목록 가져오기
export function getUsers(): LocalUser[] {
  ensureUsersFile();
  const fileContent = fs.readFileSync(USERS_FILE_PATH, 'utf8');
  const data = JSON.parse(fileContent);
  return data.users || [];
}

// 사용자 저장하기
function saveUsers(users: LocalUser[]) {
  ensureUsersFile();
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify({ users }), 'utf8');
}

// 사용자 이름으로 사용자 찾기
export function findUserByName(name: string): LocalUser | undefined {
  const users = getUsers();
  return users.find(user => user.name === name);
}

// 사용자 ID로 사용자 찾기
export function findUserById(id: string): LocalUser | undefined {
  const users = getUsers();
  return users.find(user => user.id === id);
}

// 새 사용자 생성
export async function createUser(name: string, password: string): Promise<LocalUser | null> {
  try {
    // 이미 있는 사용자인지 확인
    const existingUser = findUserByName(name);
    if (existingUser) {
      throw new Error('이미 사용 중인 아이디입니다.');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 객체 생성
    const newUser: LocalUser = {
      id: crypto.randomUUID(),
      name,
      password: hashedPassword,
      created_at: new Date().toISOString()
    };

    // 사용자 목록에 추가
    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    // 사용자 정보 반환
    return newUser;
  } catch (error) {
    console.error('사용자 생성 오류:', error);
    return null;
  }
}

// 인증 확인
export async function verifyCredentials(name: string, password: string): Promise<LocalUser | null> {
  try {
    // 사용자 찾기
    const user = findUserByName(name);
    if (!user) {
      return null;
    }

    // 비밀번호 검증
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('인증 오류:', error);
    return null;
  }
}