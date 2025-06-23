export type FormCreateValues = {
  vacancy: string;
  description: string;
  salary: number;
  location: string;
  employment: string;
  experience: string;
  category: string;
  image: string;
};

export type FormRegisterValues = {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type FormLoginValues = {
  email: string;
  password: string;
};