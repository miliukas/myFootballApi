using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Text;

namespace MyFootballApi.Models
{
    public class User
    {
        private MyFootballContext _context;
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public int? favouriteTeam { get; set; }

        /// <summary>
        /// Returns list of all website users
        /// </summary>
        /// <returns>website users list</returns>
        public List<User> GetUsers()
        {
            List<User> list = new List<User>();
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from webuser", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        string username = reader["username"].ToString();
                        string password = reader["password"].ToString();
                        string role = reader["role"].ToString();
                        string email = reader["email"].ToString();
                        int? favouriteTeam = null;
                        if (reader["favouriteTeam"].ToString().Length > 0)
                        {
                            favouriteTeam = Convert.ToInt32(reader["favouriteTeam"]);
                        }
                        list.Add(new User()
                        {
                            id = id,
                            username = username,
                            password = password,
                            role = role,
                            email = email,
                            favouriteTeam = favouriteTeam
                        });
                    }
                    reader.Close();
                }
                conn.Close();
                return list;
            }
        }
        /// <summary>
        /// returns user by choosen id
        /// </summary>
        /// <param name="id">searching user`s id</param>
        /// <returns>user</returns>
        public async Task<User> FindAsync(int id)
        {
            User userById;
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "select * from webuser where id = " + id.ToString();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    if (!reader.HasRows)
                    {
                        return null;
                    }
                    string username = reader["username"].ToString();
                    string password = reader["password"].ToString();
                    string role = reader["role"].ToString();
                    string email = reader["email"].ToString();
                    int? favouriteTeam = null;
                    if (reader["favouriteTeam"].ToString().Length > 0)
                    {
                        favouriteTeam = Convert.ToInt32(reader["favouriteTeam"]);
                    }
                    userById = new User()
                    {
                        id = id,
                        username = username,
                        password = password,
                        role = role,
                        email = email,
                        favouriteTeam = favouriteTeam
                    };
                    reader.Close();
                }
                conn.Close();
                return userById;
            }
        }
        /// <summary>
        /// Inserts new user in database
        /// </summary>
        /// <param name="user">new user</param>
        /// <returns>user</returns>
        public async Task<User> Add(User user)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            string encPass = EncDecService.Encrypt(user.password);
            query.AppendFormat("insert into webuser (username, password, role, email, favouriteTeam)"
                               + " values ('{0}','{1}','{2}','{3}','{4}')", user.username, encPass, "User", user.email, user.favouriteTeam);

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                user.password = encPass;
                conn.Close();
            }
            
            return user;
        }

        /// <summary>
        /// Removes choosen user by id
        /// </summary>
        /// <param name="user">user to be deleted</param>
        public void Remove(User user)
        {
            _context = new MyFootballContext();
            string query = "delete from webuser where webuser.id=" + user.id;
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }
        /// <summary>
        /// Updates choosen user
        /// </summary>
        /// <param name="id">user id</param>
        /// <param name="user">user update info</param>
        /// <returns>updated user</returns>
        public async Task<User> PutUser(int id, User user)
        {
            _context = new MyFootballContext();
            string encPass = EncDecService.Encrypt(user.password);
            StringBuilder query = new StringBuilder();
            query.AppendFormat("Update webuser Set username = '{0}', password = '{1}', role = '{2}', email = '{3}', favouriteTeam = '{4}'"
                               + " where id = {5}",
                              user.username, encPass, user.role, user.email, user.favouriteTeam, id);
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                user.password = encPass;
                return user;
            }
        }

        public bool doesUserExists(string username)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("select * from webuser where webuser.username='{0}'", username);
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
                        conn.Close();
                        return false;
                    }

                    else { conn.Close(); return true; }
                }
            }
        }


        /// <summary>
        /// Updates choosen user
        /// </summary>
        /// <param name="id">user id</param>
        /// <param name="user">user update info</param>
        /// <returns>updated user</returns>
        public async Task<User> PutByUsername(string username, User user)
        {
            _context = new MyFootballContext();
            string encPass = EncDecService.Encrypt(user.password);
            StringBuilder query = new StringBuilder();
            query.AppendFormat("Update webuser Set password = '{0}', email = '{1}', favouriteTeam = {2}"
                               + " where username = '{3}'",
                              encPass, user.email, user.favouriteTeam, username);
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                user.password = encPass;
                return user;
            }
        }

        /// <summary>
        /// returns user by given username
        /// </summary>
        /// <param name="username">searching user`s username</param>
        /// <returns>user</returns>
        public async Task<User> FindByUsername(string usern)
        {
            User userByUsername;
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "select * from webuser where username = '" + usern + "'";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    if (!reader.HasRows)
                    {
                        return null;
                    }
                    string username = reader["username"].ToString();
                    string password = reader["password"].ToString();
                    string role = reader["role"].ToString();
                    string email = reader["email"].ToString();
                    int? favouriteTeam = null;
                    if (reader["favouriteTeam"].ToString().Length > 0)
                    {
                        favouriteTeam = Convert.ToInt32(reader["favouriteTeam"]);
                    }
                    userByUsername = new User()
                    {
                        id = id,
                        username = username,
                        password = password,
                        role = role,
                        email = email,
                        favouriteTeam = favouriteTeam
                    };
                    reader.Close();
                }
                conn.Close();
                return userByUsername;
            }
        }

    }
}
