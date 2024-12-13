using Microsoft.AspNetCore.Mvc;
using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;

namespace WebApplication1.IRepository
{
    public interface IRequestRepo
    {
        Task<bool> RequestLeave(LeaveRequest leaveRequest);
        Task<bool> CheckRequest(int UserId, DateTime FromDate, DateTime ApplyDate);
        Task<List<LeaveRequest>> AllRequest();
        Task<LeaveRequest> GetRequestById(int id);
        Task<bool> AcceptRejectRequest(int id, Status status);

        Task<ICollection<object>> CountHistory(int id);





    }
}
