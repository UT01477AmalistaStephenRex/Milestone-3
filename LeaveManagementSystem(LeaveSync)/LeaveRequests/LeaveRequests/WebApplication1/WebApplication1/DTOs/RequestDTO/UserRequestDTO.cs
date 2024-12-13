using System.ComponentModel.DataAnnotations;
using WebApplication1.Database.Entities;

namespace WebApplication1.DTOs.RequestDTO
{
    public class UserRequestDTO
    {


        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

  

        [Required]
        [Phone]
        public string MobileNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }



        [Required]
        public Role Role { get; set; }

        public Status Status { get; set; }

    }

}

