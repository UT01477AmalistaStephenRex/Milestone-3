using System.ComponentModel.DataAnnotations;
using System.Data;

namespace WebApplication1.Database.Entities
{
    public class User
    {

        [Key]
        public int UserId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string MobileNumber { get; set; }

        [Required]
        public string Password { get; set; }


        [Required]
        public Role Role { get; set; }
   

        public Status Status { get; set; }


        public List<LeaveRequest> leaveRequests { get; set; } = new List<LeaveRequest>();
    }

}

