import api from '@/lib/api';
import { ChatMessage, ChatResponse } from '@/lib/types';
import { useState } from 'react';

export const useChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (message: string, isImage: boolean = false, file?: File | null) => {
        setLoading(true);
        setError(null);

        // Add user message to state
        let previewUrl;
        if (isImage && file) {
            previewUrl = URL.createObjectURL(file);
        }

        const userMsg: ChatMessage = {
            role: 'user',
            content: message,
            base64Image: previewUrl
        };
        setMessages((prev) => [...prev, userMsg]);

        try {
            if (isImage && file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('query', message);

                const resp = await api.post('/api/v1/chat/image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                const assistantMsg: ChatMessage = {
                    role: 'assistant',
                    content: resp.data.ensemble_response,
                    confidence: resp.data.confidence,
                    models_used: resp.data.models_used,
                    individual_responses: resp.data.individual_responses,
                    is_emergency: resp.data.is_emergency
                };
                setMessages((prev) => [...prev, assistantMsg]);
                return resp.data;
            } else {
                const resp = await api.post<ChatResponse>('/api/v1/chat', {
                    message,
                    query_type: 'general',
                    include_individual: true,
                    history: messages.slice(-10) // Send last 10 messages as context
                });

                const assistantMsg: ChatMessage = {
                    role: 'assistant',
                    content: resp.data.ensemble_response,
                    confidence: resp.data.confidence,
                    models_used: resp.data.models_used,
                    individual_responses: resp.data.individual_responses,
                    is_emergency: resp.data.is_emergency
                };
                setMessages((prev) => [...prev, assistantMsg]);
                return resp.data;
            }
        } catch (err: any) {
            const msg = err.response?.data?.detail || 'Something went wrong';
            setError(msg);
            // Remove the user message if it failed
            setMessages((prev) => prev.slice(0, -1));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { messages, setMessages, sendMessage, loading, error };
};
