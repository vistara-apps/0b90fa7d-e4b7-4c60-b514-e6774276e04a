'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ListTodo, Clock } from 'lucide-react';
import { Task as TaskType } from '@/lib/types';

interface TasksCardProps {
  tasks?: TaskType[];
  isLoading?: boolean;
}

export function TasksCard({ tasks = [], isLoading = false }: TasksCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [localTasks, setLocalTasks] = useState<TaskType[]>(tasks);

  // Update local tasks when props change
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const toggleTask = async (taskId: string) => {
    // Optimistically update UI
    setLocalTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
          : task
      )
    );

    // TODO: Call API to update task status
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: localTasks.find(t => t.id === taskId)?.status === 'done' ? 'pending' : 'done'
        })
      });

      if (!response.ok) {
        // Revert on error
        setLocalTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId
              ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
              : task
          )
        );
      }
    } catch (error) {
      // Revert on error
      setLocalTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
            : task
        )
      );
    }
  };

  const pendingTasks = localTasks.filter(task => task.status !== 'done');
  const completedTasks = localTasks.filter(task => task.status === 'done');

  if (isLoading) {
    return (
      <div className="metric-card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div className="h-6 w-20 bg-slate-200 rounded"></div>
          <div className="h-8 w-8 bg-slate-200 rounded"></div>
        </div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>
    );
  }

  const getPriorityColor = (score: number) => {
    if (score >= 80) return 'text-danger';
    if (score >= 60) return 'text-warning';
    return 'text-info';
  };

  const getPriorityIcon = (score: number) => {
    if (score >= 80) return '🔴';
    if (score >= 60) return '🟡';
    return '🔵';
  };

  return (
    <div
      className="metric-card cursor-pointer hover:bg-opacity-70 transition-all duration-200"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-info bg-opacity-20 flex items-center justify-center">
            <ListTodo className="w-5 h-5 text-info" />
          </div>
          <h3 className="font-semibold">Tasks</h3>
        </div>
        <div className="text-3xl font-bold text-info">
          {pendingTasks.length}
        </div>
      </div>

      {expanded ? (
        <div className="space-y-3 mt-4 pt-4 border-t border-slate-200">
          {pendingTasks.length === 0 ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-sm text-muted">All tasks completed!</p>
            </div>
          ) : (
            pendingTasks.slice(0, 5).map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(task.id);
                }}
              >
                <Circle className="w-5 h-5 text-muted flex-shrink-0 group-hover:text-info transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{task.title}</p>
                  {task.description && (
                    <p className="text-xs text-muted truncate">{task.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs ${getPriorityColor(task.aiPriorityScore)}`}>
                      Priority {task.aiPriorityScore}
                    </span>
                    {task.dueDate && (
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {completedTasks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-muted mb-2">Completed Today ({completedTasks.length})</p>
              <div className="space-y-1">
                {completedTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center gap-2 text-xs text-muted">
                    <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                    <span className="truncate">{task.title}</span>
                  </div>
                ))}
                {completedTasks.length > 3 && (
                  <p className="text-xs text-muted">+{completedTasks.length - 3} more completed</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">Tap to expand</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-success">{completedTasks.length} done</span>
              <span className="text-muted">•</span>
              <span>{pendingTasks.length} pending</span>
            </div>
          </div>
      )}
    </div>
  );
}

