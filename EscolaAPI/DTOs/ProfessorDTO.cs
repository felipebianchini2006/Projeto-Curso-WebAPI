namespace EscolaAPI.DTOs
{
    public class ProfessorDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Materia { get; set; }
    }

    public class ProfessorCreateDTO
    {
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; } // DateTime aceita string automaticamente
        public string Materia { get; set; }
    }
}