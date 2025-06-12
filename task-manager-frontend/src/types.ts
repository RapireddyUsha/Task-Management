export interface Team {
  _id: string;
  name: string;
  email: string;
  designation: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  teamMembers: string[] | Team[];
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  project: string | Project;
  assignedMembers: string[] | Team[];
  status: 'to-do' | 'in-progress' | 'done' | 'cancelled';
}
