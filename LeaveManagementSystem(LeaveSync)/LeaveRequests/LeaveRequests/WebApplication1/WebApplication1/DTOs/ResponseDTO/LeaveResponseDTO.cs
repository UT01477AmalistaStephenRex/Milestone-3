using WebApplication1.Database.Entities;

namespace WebApplication1.DTOs.ResponseDTO
{
    public class LeaveResponseDTO
    {

        public int RequestId { get; set; }


        public string Reason { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ApplyDate { get; set; }

        public string Days { get; set; }

        public String Status { get; set; }
    }
}
