using Microsoft.EntityFrameworkCore;
using MimeKit;
using OpenCV.Net;
using System.Net.Mail;
using WebApplication1.Database;
using WebApplication1.Database.Entities;
using WebApplication1.IRepository;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1.Repository
{
    public class RequestRepository : IRequestRepo
    {
        private readonly LeaveDBContext _leaveDBContext;

        public RequestRepository(LeaveDBContext leaveDBContext)
        {
            _leaveDBContext = leaveDBContext;   
        }
        public async Task<bool> RequestLeave(LeaveRequest leaveRequest)
        {
            var checkUser = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.UserId == leaveRequest.UserId);
            if (checkUser == null)
            {
                throw new Exception("No Such User!");
            }
            var data = await _leaveDBContext.leaveRequests.AddAsync(leaveRequest);
            await _leaveDBContext.SaveChangesAsync();
            if (data != null)
            {
                return true;
            }
            else
            {
                return false;
            }


        }

        public async Task<bool> CheckRequest(int UserId, DateTime FromDate, DateTime ApplyDate)
        {

            var data = await _leaveDBContext.leaveRequests
                    .Where(r => r.UserId == UserId && r.Status == Status.Pending).ToListAsync();
            foreach (var d in data)
            {
                if (d.FromDate < ApplyDate && d.ApplyDate > FromDate)
                {
                    return true;

                }
            }
            return false;
        }

        public async Task<List<LeaveRequest>> AllRequest()
        {
            var data = await  _leaveDBContext.leaveRequests.ToListAsync();
            if (data != null)
            {
                return data;
            }
            else
            {
                return new List<LeaveRequest>();
            }
        }

        public async Task<LeaveRequest> GetRequestById(int id)
        {
            var data = await _leaveDBContext.leaveRequests.FirstOrDefaultAsync(r => r.RequestId == id);
            return data;
        }

        public async Task<bool> AcceptRejectRequest(int id, Status status)
        {
            var request = await _leaveDBContext.leaveRequests.FirstOrDefaultAsync(r => r.RequestId == id);
            if (request == null)
            {
                throw new Exception("Invalid Request!");
            }

            bool requestStatus = true;

            var getUser = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.UserId == request.UserId);
            if (getUser == null)
            {
                throw new Exception("No Such User!");
            }

            if (status == Status.Rejected)  // Compare enum value directly
            {
                request.Status = Status.Rejected;
                requestStatus = false;
            }
            else if (status == Status.Pending)  // Compare enum value directly
            {
                request.Status = Status.Pending;
                requestStatus = true;
            }
            else if (status == Status.Accepted)  // Compare enum value directly
            {
                request.Status = Status.Accepted;
                requestStatus = true;
            }
            else
            {
                // Optionally handle cases where the status doesn't match any expected values
                throw new ArgumentException("Invalid status value.");
            }

            // Save the updated request status to the database (if necessary)
            await _leaveDBContext.SaveChangesAsync();

            // Return the status indicating success or failure of the operation
            return requestStatus;
        }
    

            public async Task<ICollection<object>> CountHistory(int id)
        {
            // Retrieve user and their leave requests
            var user = await _leaveDBContext.Users
                        .Where(u => u.UserId == id)
                        .Select(u => new
                        {
                            u.FirstName,
                            u.LastName,
                            u.Email,
                            u.MobileNumber,
                            LeaveRequests = u.leaveRequests
                        })
                        .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new Exception($"User with ID {id} not found.");
            }
            var result = new List<object>
    {
        new { Label = "First Name", Value = user.FirstName },
        new { Label = "Last Name", Value = user.LastName },
        new { Label = "Email", Value = user.Email },
        new { Label = "Mobile Number", Value = user.MobileNumber }
    };

            return result;
        }

    }
}
