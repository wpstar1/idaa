'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Comment as CommentType } from '@/types/models';

type CommentWithUser = CommentType & {
  users?: {
    id: string;
    name: string | null;
    // image 필드 제거 (데이터베이스에 해당 필드가 없음)
  };
};

export default function CommentSection({
  ideaId,
  initialComments = [],
}: {
  ideaId: string;
  initialComments: CommentWithUser[];
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentWithUser[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push('/login');
      return;
    }

    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ideaId,
          content: comment,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '댓글을 추가하는 데 실패했습니다.');
      }

      const newComment = await response.json();
      
      // 댓글 목록 업데이트
      setComments((prev) => [newComment, ...prev]);
      setComment('');
      router.refresh(); // 페이지 데이터 갱신
    } catch (err) {
      setError(err instanceof Error ? err.message : '댓글을 추가하는 데 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!session) return;
    
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '댓글을 삭제하는 데 실패했습니다.');
      }

      // 댓글 목록에서 해당 댓글 제거
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      router.refresh(); // 페이지 데이터 갱신
    } catch (err) {
      alert(err instanceof Error ? err.message : '댓글을 삭제하는 데 실패했습니다.');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[#a48eff]">댓글 ({comments.length})</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <textarea
            className="w-full px-3 py-2 bg-[#2d2b42] text-gray-200 border border-[#3d3b52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48eff] placeholder-gray-400"
            rows={3}
            placeholder={session ? "댓글을 작성해주세요..." : "댓글을 작성하려면 로그인하세요."}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!session || isSubmitting}
          ></textarea>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-900/20 text-red-400 rounded-lg border border-red-800">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={!session || isSubmitting || !comment.trim()}
          className="px-4 py-2 font-semibold text-white bg-[#a48eff] rounded-md hover:bg-[#8a6dff] focus:outline-none focus:ring-2 focus:ring-[#a48eff] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '등록 중...' : '댓글 등록'}
        </button>
      </form>
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-4">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-[#2d2b42] p-4 rounded-lg border border-[#3d3b52]">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div>
                    <div className="font-semibold text-white">{comment.users?.name || '익명'}</div>
                    <div className="text-xs text-gray-400">{formatDate(new Date(comment.created_at))}</div>
                  </div>
                </div>
                
                {session?.user.id === comment.user_id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    삭제
                  </button>
                )}
              </div>
              
              <div className="mt-2 text-gray-300 whitespace-pre-line">
                {comment.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}