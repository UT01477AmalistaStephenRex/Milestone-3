using WebApplication1.Database.Entities;

namespace WebApplication1.DTOs.RequestDTO
{
    public class LoginRequestDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public Role Role {  get; set; }
    }
}
