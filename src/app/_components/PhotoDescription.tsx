'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackDescriptionUpdate } from "~/utils/analytics";

export default function PhotoDescription({ 
    photoId, 
    initialDescription 
}: { 
    photoId: number, 
    initialDescription: string 
}) {
    const [description, setDescription] = useState(initialDescription);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    async function handleSave() {
        setIsSaving(true);
        
        try {
            const response = await fetch(`/api/photos/${photoId}/description`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to save description');
            }
            
            trackDescriptionUpdate(photoId.toString());
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error('Error saving description:', error);
            alert('保存失败，请重试');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">照片說明</h2>
                {!isEditing ? (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        編輯
                    </button>
                ) : (
                    <div className="space-x-2">
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                            disabled={isSaving}
                        >
                            取消
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            disabled={isSaving}
                        >
                            {isSaving ? '保存中...' : '保存'}
                        </button>
                    </div>
                )}
            </div>
            
            {isEditing ? (
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
                    placeholder="添加照片說明..."
                    disabled={isSaving}
                />
            ) : (
                <p className="text-white whitespace-pre-wrap min-h-[60px]">
                    {description || "暂無說明，點擊並編輯"}
                </p>
            )}
        </div>
    );
}