// AlunoDTO.cs
namespace EscolaAPI.DTOs
{
    public class AlunoDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public int Escolaridade { get; set; }
        public int ProfessorId { get; set; }
        public string ProfessorNome { get; set; }
    }

    public class AlunoCreateDTO
    {
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public int Escolaridade { get; set; }
        public int ProfessorId { get; set; }
    }
}
