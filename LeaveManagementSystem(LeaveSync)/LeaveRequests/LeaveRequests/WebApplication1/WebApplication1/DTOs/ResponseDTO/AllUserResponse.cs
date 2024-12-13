using WebApplication1.Database.Entities;

namespace WebApplication1.DTOs.ResponseDTO
{
    public class AllUserResponse
    {
        public int UserId { get; set; }


        public string FirstName { get; set; }


        public string LastName { get; set; }

        public string Email { get; set; }


        public string MobileNumber { get; set; }

        public string Password { get; set; }

        public Role Role {  get; set; }

        public string Status { get; set; }
    }
}
