using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFootballApi.Models
{
    public class UserManagementService : IUserManagementService
    {
        public bool IsValidUser(string username, string password)
        {
            return true;
        }
    }
}
