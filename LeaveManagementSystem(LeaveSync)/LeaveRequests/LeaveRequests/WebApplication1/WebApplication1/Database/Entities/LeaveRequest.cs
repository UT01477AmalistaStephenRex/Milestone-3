using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Database.Entities
{
    public class LeaveRequest
    {



        [Key]
        public int RequestId { get; set; }


        [ForeignKey("User")]
        public int UserId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ApplyDate { get; set; }

        public string Days { get; set; }

        public string Reason { get; set; }


        public Status Status { get; set; }

        public User? User { get; set; }


    }

}

