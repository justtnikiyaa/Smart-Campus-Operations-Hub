import React, { useState } from 'react';
import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BellRing, ShieldCheck, Users2, X } from "lucide-react";
import notificationService from "../services/notificationService";

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSendAlert = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    setFeedback(null);
    try {
      await notificationService.sendBroadcast(title, message);
      setFeedback({ type: 'success', text: 'Campus alert broadcasted successfully!' });
      setTitle('');
      setMessage('');
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Failed to send alert.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AppLayout title="Admin">
      <div className="space-y-4">
        <Card className="border-slate-200/80 bg-white/90 backdrop-blur-sm dark:border-cyan-300/20 dark:bg-[#111a2d]/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Admin Controls</CardTitle>
            <CardDescription>
              Manage operations, send notifications, and monitor system-level updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/85 p-3 dark:border-cyan-300/15 dark:bg-[#0d1628]">
                <div className="mb-2 inline-flex rounded-lg bg-blue-100 p-2 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                  <BellRing className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notification broadcast</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Send campus-wide alerts and notices.</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/85 p-3 dark:border-cyan-300/15 dark:bg-[#0d1628]">
                <div className="mb-2 inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                  <Users2 className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">User oversight</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Track user activity and role assignment health.</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/85 p-3 dark:border-cyan-300/15 dark:bg-[#0d1628]">
                <div className="mb-2 inline-flex rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Security status</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Keep role-based access and permissions clean.</p>
              </div>
            </div>

            <Button onClick={() => setIsModalOpen(true)}>Send Campus Alert</Button>
          </CardContent>
        </Card>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-[#0d1628] dark:border dark:border-cyan-300/20">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold dark:text-white">Send Campus Alert</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {feedback && (
              <div className={`mb-4 rounded p-3 text-sm ${feedback.type === 'success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                {feedback.text}
              </div>
            )}

            <form onSubmit={handleSendAlert} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium dark:text-slate-200">Alert Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Campus Closure"
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium dark:text-slate-200">Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your alert message here..."
                  rows={4}
                  className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button type="button" variant="outline" className="border-slate-300 dark:border-slate-600 dark:bg-transparent dark:text-white" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting || !title.trim() || !message.trim()} className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  {isSubmitting ? 'Sending...' : 'Send Alert'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
