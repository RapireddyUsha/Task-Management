import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task, Project, Team } from '../../types';

const TaskPage: React.FC = () => {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-warning">
              <h5 className="mb-0">{editTask ? '✏️ Edit Task' : '➕ Add Task'}</h5>
            </div>
            <div className="card-body">
              <TaskForm
                editId={editTask?._id}
                defaultValues={
                  editTask
                    ? {
                        title: editTask.title,
                        description: editTask.description,
                        deadline: editTask.deadline.split('T')[0],
                        project: typeof editTask.project === 'string' ? editTask.project : (editTask.project as Project)._id,
                        assignedMembers: (editTask.assignedMembers as Team[]).map(m => m._id),
                        status: editTask.status,
                      }
                    : undefined
                }
                onSuccess={() => {
                  setEditTask(null);
                  setRefresh(!refresh);
                }}
              />
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="col-md-8">
          <TaskList onEdit={setEditTask} key={refresh ? 'yes' : 'no'} />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
