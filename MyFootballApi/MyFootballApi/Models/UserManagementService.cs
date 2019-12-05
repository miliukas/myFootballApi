using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFootballApi.Models
{
    public class UserManagementService : IUserManagementService
    {
        private MyFootballContext _context;
        public bool IsValidUser(string username, string password, out string role)
        {
            role = string.Empty;
            User userFromDB = getUserByUsername(username);
            if (userFromDB == null)
                return false;
            if (userFromDB.password.Equals(EncDecService.Encrypt(password)))
            {
                role = userFromDB.role;
                return true;
            }
            
            return false;
        }

        private User getUserByUsername(string username)
        {
            User userFromDB;
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("select * from webuser where webuser.username = '{0}'", username);
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    if (!reader.HasRows)
                    {
                        return null;
                    }
                    string usernameDB = reader["username"].ToString();
                    string passwordDB = reader["password"].ToString();
                    string role = reader["role"].ToString();
                 
                    userFromDB = new User()
                    {
                        username = usernameDB,
                        password = passwordDB,
                        role = role
                    };
                    reader.Close();
                }
                conn.Close();
                return userFromDB;
            }
        }
    }
}
