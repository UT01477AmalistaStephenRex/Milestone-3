using WebApplication1.Database.Entities;

namespace WebApplication1.DTOs.RequestDTO
{
    public class LRequestDTO
    {
        public int UserId { get; set; }



    

        public string Reason { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ApplyDate { get; set; }

        public string Days { get; set; }   


        public Status Status { get; set; }

    }

}

