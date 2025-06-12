import React, { useState } from 'react';
import TeamForm from './TeamForm';
import TeamList from './TeamList';
import { Team } from '../../types';

const TeamPage: React.FC = () => {
  const [editData, setEditData] = useState<Team | null>(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">{editData ? '✏️ Edit Team Member' : '➕ Add Team Member'}</h5>
            </div>
            <div className="card-body">
              <TeamForm
                editId={editData?._id}
                defaultValues={editData ?? undefined}
                onSuccess={() => {
                  setEditData(null);
                  setRefresh(!refresh);
                }}
              />
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="col-md-8">
          <TeamList onEdit={setEditData} key={refresh ? 'yes' : 'no'} />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
