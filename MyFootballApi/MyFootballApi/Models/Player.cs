using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Text;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MyFootballApi.Models
{
    public class Player
    {
        private MyFootballContext _context;
        public int id { get; set; }
        [Required]
        [StringLength(40, MinimumLength = 5)]
        public string first_name { get; set; }
        [Required]
        public string last_name { get; set; }
        [Required]
        public DateTime birth_date { get; set; }
        [Required]
        public int age { get; set; }
        public string possition { get; set; }
        [Required]
        public string nationality { get; set; }
        [Required]
        public double weight { get; set; }
        [Required]
        public double height { get; set; }
        [Required]
        public int goals { get; set; }
        [Required]
        public int injured { get; set; }
        [Required]
        public string league { get; set; }
        [Required]
        public string season { get; set; }
        public int fk_TeamId { get; set; }

        public Player(string first_name, string last_name, DateTime birth_date, int age, string possition,
            string nationality, double weight, double height, int goals, int injured, string league, string season, int fk_TeamId)
        {
            this.first_name = first_name;
            this.last_name = last_name;
            this.birth_date = birth_date;
            this.age = age;
            this.possition = possition;
            this.nationality = nationality;
            this.weight = weight;
            this.height = height;
            this.goals = goals;
            this.injured = injured;
            this.league = league;
            this.season = season;
            this.fk_TeamId = fk_TeamId;
        }

        public Player()
        {

        }

        public  List<Player> GetPlayers()
        {
            List<Player> list = new List<Player>();
            _context = new MyFootballContext();

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from player", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        string first_name = reader["firstName"].ToString();
                        string last_name = reader["lastName"].ToString();
                        DateTime birth_date = Convert.ToDateTime(reader["birthDate"].ToString());
                        int age = Convert.ToInt32(reader["age"]);
                        string possition = reader["possition"].ToString();
                        string nationality = reader["nationality"].ToString();
                        double weight = Convert.ToDouble(reader["weight"]);
                        double height = Convert.ToDouble(reader["height"]);
                        int goals = Convert.ToInt32(reader["goals"]);
                        string league = reader["league"].ToString();
                        int injured = Convert.ToInt32(reader["injured"]);
                        string season = reader["season"].ToString();
                        int fk_Teamid = Convert.ToInt32(reader["fk_Teamid"]);
                        list.Add(new Player()
                        {
                            id = id,
                            first_name = first_name,
                            last_name = last_name,
                            birth_date = birth_date,
                            age = age,
                            possition = possition,
                            nationality = nationality,
                            weight = weight,
                            height = height,
                            goals = goals,
                            league = league,
                            injured = injured,
                            season = season,
                            fk_TeamId = fk_Teamid
                        });
                    }
                    reader.Close();
                }
                conn.Close();
                return list;
            }
        }


        public async Task<Player> FindAsync(int id)
        {
            Player playerById;
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "select * from player where id = " + id.ToString();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    if (!reader.HasRows)
                    {
                        return null;
                    }
                    string firstname = reader["firstName"].ToString();
                    string last_name = reader["lastName"].ToString();
                    DateTime birth_date = Convert.ToDateTime(reader["birthDate"]);
                    int age = Convert.ToInt32(reader["age"]);
                    string possition = reader["possition"].ToString();
                    string nationality = reader["nationality"].ToString();
                    double weight = Convert.ToDouble(reader["weight"]);
                    double height = Convert.ToDouble(reader["height"]);
                    int goals = Convert.ToInt32(reader["goals"]);
                    string league = reader["league"].ToString();
                    int injured = Convert.ToInt32(reader["injured"]);
                    string season = reader["season"].ToString();
                    int fk_Teamid = Convert.ToInt32(reader["fk_Teamid"]);
                    playerById = new Player()
                    {
                        id = id,
                        first_name = firstname,
                        last_name = last_name,
                        birth_date = birth_date,
                        age = age,
                        possition = possition,
                        nationality = nationality,
                        weight = weight,
                        height = height,
                        goals = goals,
                        league = league,
                        injured = injured,
                        season = season,
                        fk_TeamId = fk_Teamid
                    };
                    reader.Close();
                }
                conn.Close();
                return playerById;
            }
        }

        public async Task<Player> Add(Player player)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("insert into player (firstName, lastName, birthDate, age, possition, nationality, weight, height, goals, league, injured, season, fk_Teamid)"
                               + " values ('{0}','{1}','{2}','{3}','{4}','{5}',{6},{7},{8},'{9}',{10},'{11}',{12})", player.first_name, player.last_name, player.birth_date.Date.ToShortDateString(), player.age,
                               player.possition, player.nationality, player.weight, player.height, player.goals, player.league, player.injured, player.season, player.fk_TeamId);

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return player;
        }

        public void Remove(Player player)
        {
            _context = new MyFootballContext();
            string query = "delete from player where player.id=" + player.id;
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public async Task<Player> PutPlayer(int id, Player player)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("Update player Set firstName = '{0}', lastName = '{1}', birthDate = '{2}', age = {3}, possition = '{4}', nationality = '{5}', "
                             + "weight = {6}, height = {7}, goals = {8}, league = '{9}', injured = {10}, season = '{11}', fk_Teamid = {12} where id = {13}",
                             player.first_name, player.last_name, player.birth_date.ToShortDateString(), player.age, player.possition,
                             player.nationality, player.weight, player.height, player.goals, player.league, player.injured,
                             player.season, player.fk_TeamId, id);

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                return player;
            }
        }

        public void RemoveLastPlayer()
        {
            _context = new MyFootballContext();
            string query = "DELETE FROM player WHERE id=(SELECT MAX(id) FROM player)"; 
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public int MaxId()
        {
            int maxId;
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "SELECT id FROM player WHERE id = (SELECT max(id) FROM player)";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    maxId = Convert.ToInt32(reader["id"]);
                    reader.Close();
                }
                conn.Close();
            }
            return maxId;
        }

        public bool Exist(int id)
        {
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "select * from player where id = " + id.ToString();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    if (!reader.HasRows)
                    {
                        return false;
                    }
                    
                    reader.Close();
                }
                conn.Close();
                return true;
            }
        }


    }
}
