using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Text;

namespace MyFootballApi.Models
{
    public class Player
    {
        private MyFootballContext _context;
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public DateTime birth_date { get; set; }
        public int age { get; set; }
        public string possition { get; set; }
        public string nationality { get; set; }
        public double weight { get; set; }
        public double height { get; set; }
        public int goals { get; set; }
        public int injured { get; set; }
        public string league { get; set; }
        public string season { get; set; }
        public int fk_TeamId { get; set; }

        public  List<Player> GetPlayers()
        {
            List<Player> list = new List<Player>();
            _context = new MyFootballContext();

            using (SqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("select * from player", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        string first_name = reader["firstName"].ToString();
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
            using (SqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "select * from player where id = " + id.ToString();
                SqlCommand cmd = new SqlCommand(query, conn);
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
                               + " values ('{0}','{1}','{2}',{3},'{4}','{5}',{6},{7},{8},'{9}',{10},'{11}',{12})", player.first_name, player.last_name, player.birth_date, player.age,
                               player.possition, player.nationality, player.weight, player.height, player.goals, player.league, player.injured, player.season, player.fk_TeamId);

            using (SqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                SqlCommand cmd = new SqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                return player;
            }
        }

        public void Remove(Player player)
        {
            _context = new MyFootballContext();
            string query = "delete from player where player.id=" + player.id;
            using (SqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public async Task<Player> PutPlayer(int id, Player player)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            //possition = { 4}, nationality = { 5}, weight = { 6}, height = { 7}, goals = { 8}, league = { 9}, injured = { 10}, season = { 11}, fk_Teamid = { 12}) where id = { 14 }
            query.AppendFormat("Update player Set firstName = '{0}', lastName = '{1}', birthDate = '{2}', age = {3}, possition = '{4}', nationality = '{5}', "
                             + "weight = {6}, height = {7}, goals = {8}, league = '{9}', injured = {10}, season = '{11}', fk_Teamid = {12} where id = {13}",
                             player.first_name, player.last_name, player.birth_date, player.age, player.possition,
                             player.nationality, player.weight, player.height, player.goals, player.league, player.injured,
                             player.season, player.fk_TeamId, id);

            using (SqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                SqlCommand cmd = new SqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                return player;
            }
        }



    }
}
