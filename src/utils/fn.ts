
export const formatCPF = (cpf: string) => {
  return cpf.replace(/\D/g, '');
};

export const formatDate = (date: string) => {
  const [year, mounth, day] = date.split('-');
  return `${day}/${mounth}/${year}`;
};