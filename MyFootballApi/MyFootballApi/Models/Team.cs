using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Text;

namespace MyFootballApi.Models
{
    public class Team
    {
        private MyFootballContext _context;
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string logo { get; set; }
        public string country { get; set; }
        public DateTime founded { get; set; }
        public string vanue_name { get; set; }
        public string vanue_city { get; set; }
        public int vanue_capacity { get; set; }

        /// <summary>
        /// get all teams info from database
        /// </summary>
        /// <returns>List of teams</returns>
        public List<Team> GetTeams()
        {
            List<Team> list = new List<Team>();
            _context = new MyFootballContext();

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from team", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        string name = reader["name"].ToString();
                        string code = reader["code"].ToString();
                        string logo = reader["logo"].ToString();
                        string country = reader["country"].ToString();
                        DateTime founded = Convert.ToDateTime(reader["founded"]);
                        string vanue_name = reader["vanue_name"].ToString();
                        string vanue_city = reader["vanue_city"].ToString();
                        int vanue_capacity = Convert.ToInt32(reader["vanue_capacity"]);
                        list.Add(new Team()
                        {
                            id = id,
                            name = name,
                            code = code,
                            logo = logo, 
                            country = country,
                            founded = founded,
                            vanue_name = vanue_name,
                            vanue_city = vanue_city,
                            vanue_capacity = vanue_capacity
                        });
                    }
                    reader.Close();
                }
                conn.Close();
                return list;
            }
        }

        /// <summary>
        /// Finds and returns team info by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>returns team info by id</returns>
        public async Task<Team> FindAsync(int id)
        {
            Team teamById;
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "select * from team where id = " + id.ToString();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    if (!reader.HasRows)
                    {
                        return null;
                    }
                    string name = reader["name"].ToString();
                    string code = reader["code"].ToString();
                    string logo = reader["logo"].ToString();
                    string country = reader["country"].ToString();
                    DateTime founded = Convert.ToDateTime(reader["founded"].ToString());
                    string vanue_name = reader["vanue_name"].ToString();
                    string vanue_city = reader["vanue_city"].ToString();
                    int vanue_capacity = Convert.ToInt32(reader["vanue_capacity"]);
                    teamById = new Team()
                    {
                        id = id,
                        name = name,
                        code = code,
                        logo = logo,
                        country = country,
                        founded = founded,
                        vanue_name = vanue_name,
                        vanue_city = vanue_city,
                        vanue_capacity = vanue_capacity
                    };
                    reader.Close();
                }
                conn.Close();
                return teamById;
            }
        }
        /// <summary>
        /// Adds new team in database
        /// </summary>
        /// <param name="team">new team</param>
        /// <returns>new team</returns>
        public async Task<Team> Add(Team team)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("insert into team (name, code, logo, country, founded, vanue_name, vanue_city, vanue_capacity)"
                               + " values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}',{7})", team.name, team.code, team.logo, team.country, team.founded.ToShortDateString(), team.vanue_name,
                               team.vanue_city, team.vanue_capacity);

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                return team;
            }
        }
        /// <summary>
        /// Removes team by choosen id
        /// </summary>
        /// <param name="team">choosen team id</param>
        public void Remove(Team team)
        {
            _context = new MyFootballContext();
            string query = "delete from team where team.id=" + team.id;
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }
        /// <summary>
        /// Updates team info by id
        /// </summary>
        /// <param name="id">team id</param>
        /// <param name="team">team update fields</param>
        /// <returns></returns>
        public async Task<Team> PutTeam(int id, Team team)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("Update team Set name = '{0}', code = '{1}', logo = '{2}', country = '{3}', founded = '{4}', vanue_name = '{5}', "
                             + "vanue_city = '{6}', vanue_capacity = {7} where id = {8}",
                            team.name, team.code, team.logo, team.country, team.founded.ToShortDateString(), team.vanue_name,
                            team.vanue_city, team.vanue_capacity, id);

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                return team;
            }
        }


    }
}
