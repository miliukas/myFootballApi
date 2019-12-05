using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Text;


namespace MyFootballApi.Models
{
    public class Game
    {
        private MyFootballContext _context;
        public int id { get; set; }
        public DateTime eventDate { get; set; }
        public int goalsHomeTeam { get; set; }
        public int goalsAwayTeam { get; set; }
        public string venue { get; set; }
        public int elapsed { get; set; }
        public int fk_Teamid { get; set; }
        public int fk_Teamid1 { get; set; }

        /// <summary>
        /// Gets all games from database
        /// </summary>
        /// <returns>list of all games</returns>
        public List<Game> GetGames()
        {
            List<Game> list = new List<Game>();
            _context = new MyFootballContext();

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from game", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int id = Convert.ToInt32(reader["id"]);
                        DateTime eventDate = Convert.ToDateTime(reader["eventDate"]);
                        int goalsHomeTeam = Convert.ToInt32(reader["goalsHomeTeam"]);
                        int goalsAwayTeam = Convert.ToInt32(reader["goalsAwayTeam"]);
                        string venue = reader["venue"].ToString();
                        int elapsed = Convert.ToInt32(reader["elapsed"]);
                        int fk_Teamid = Convert.ToInt32(reader["fk_Teamid"]);
                        int fk_Teamid1 = Convert.ToInt32(reader["fk_Teamid1"]);
                        list.Add(new Game()
                        {
                            id = id,
                            eventDate = eventDate,
                            goalsHomeTeam = goalsHomeTeam,
                            goalsAwayTeam = goalsAwayTeam,
                            venue = venue,
                            elapsed = elapsed,
                            fk_Teamid = fk_Teamid,
                            fk_Teamid1 = fk_Teamid1
                        });
                    }
                    reader.Close();
                }
                conn.Close();
                return list;
            }
        }

        /// <summary>
        /// Finds game by id
        /// </summary>
        /// <param name="id">searching game`s id</param>
        /// <returns>game</returns>
        public async Task<Game> FindAsync(int id)
        {
            Game gameById;
            _context = new MyFootballContext();
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string query = "select * from game where id = " + id.ToString();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    if (!reader.HasRows)
                    {
                        return null;
                    }
                    DateTime eventDate = Convert.ToDateTime(reader["eventDate"]);
                    int goalsHomeTeam = Convert.ToInt32(reader["goalsHomeTeam"]);
                    int goalsAwayTeam = Convert.ToInt32(reader["goalsAwayTeam"]);
                    string venue = reader["venue"].ToString();
                    int elapsed = Convert.ToInt32(reader["elapsed"]);
                    int fk_Teamid = Convert.ToInt32(reader["fk_Teamid"]);
                    int fk_Teamid1 = Convert.ToInt32(reader["fk_Teamid1"]);
                    gameById = new Game()
                    {
                        id = id,
                        eventDate = eventDate,
                        goalsHomeTeam = goalsHomeTeam,
                        goalsAwayTeam = goalsAwayTeam,
                        venue = venue,
                        elapsed = elapsed,
                        fk_Teamid = fk_Teamid,
                        fk_Teamid1 = fk_Teamid1
                    };
                    reader.Close();
                }
                conn.Close();
                return gameById;
            }
        }


        /// <summary>
        /// Adds new game in data base
        /// </summary>
        /// <param name="game">given game to be added to database</param>
        /// <returns>game</returns>
        public async Task<Game> Add(Game game)

        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("insert into game (eventDate, goalsHomeTeam, goalsAwayTeam, venue, elapsed, fk_Teamid, fk_Teamid1)"
                               + " values ('{0}',{1},{2},'{3}',{4},{5},{6})", game.eventDate.ToString(), game.goalsHomeTeam, game.goalsAwayTeam, game.venue,
                               game.elapsed, game.fk_Teamid, game.fk_Teamid1);

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                return game;
            }
        }
        /// <summary>
        /// Removes choosen game`s from database
        /// </summary>
        /// <param name="game"></param>
        public void Remove(Game game)
        {
            _context = new MyFootballContext();
            string query = "delete from game where game.id=" + game.id;
            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public async Task<Game> PutGame(int id, Game game)
        {
            _context = new MyFootballContext();
            StringBuilder query = new StringBuilder();
            query.AppendFormat("Update game Set eventDate = '{0}', goalsHomeTeam = {1}, goalsAwayTeam = {2}, venue = '{3}', elapsed = {4}, "
                             + "fk_Teamid = {5}, fk_Teamid1 = {6} where id = {7}",
                             game.eventDate.ToString(), game.goalsHomeTeam, game.goalsAwayTeam, game.venue, game.elapsed, game.fk_Teamid, game.fk_Teamid1, id);

            using (MySqlConnection conn = _context.GetConnection())
            {
                conn.Open();
                string q = query.ToString();
                MySqlCommand cmd = new MySqlCommand(q, conn);
                cmd.ExecuteNonQuery();
                conn.Close();
                return game;
            }
        }

    }
}
