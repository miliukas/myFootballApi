using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;

namespace MyFootballApi.Models
{
    public class MyFootballContext : DbContext
    {
        public string ConnectionString { get; set; }
        public Player player;
        public Team team;
        public Game game;
        public User user;
        public MyFootballContext()
        {
            this.ConnectionString = "Server=tcp:visadabus.database.windows.net, 1433; Initial Catalog=myFootball; Persist Security Info = false; User ID = ernestas; Password = Miliukas.; MultipleActiveResultSets=False; Encrypt=True; TrustServerCertificate=False; Connection Timeout=30;";
            player = new Player();
            team = new Team();
            game = new Game();
            user = new User();
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }



        public MyFootballContext(DbContextOptions<MyFootballContext> options)
           : base(options)
        {
        }
        //public DbSet<Player> Players { get; set; }
        //public DbSet<Team> Teams { get; set; }
    }
}
