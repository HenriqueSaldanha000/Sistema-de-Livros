namespace backend.Models
{
    public class Livro
    {
        public int Id { get; set; }  // Primary Key
        public string Titulo { get; set; } = "";
        public string Autor { get; set; } = "";
    }
}