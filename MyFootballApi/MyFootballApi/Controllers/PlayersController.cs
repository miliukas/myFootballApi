using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyFootballApi.Models;

namespace MyFootballApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly MyFootballContext _context;

        public PlayersController(MyFootballContext context)
        {
            _context = context;
        }

        // GET: api/Players
        [Route("~/api/Players")]
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<Player> GetPlayers()
        {

            return _context.player.GetPlayers();
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPlayer([FromRoute] int id)
        {
            var player = await _context.player.FindAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // PUT: api/Players/5
        [HttpPut("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> PutPlayer([FromRoute] int id, [FromBody] Player player)
        {
            var playerToPut = await _context.player.FindAsync(id);

            if (playerToPut == null)
            {
                return NotFound(player);
            }
            _context.player.PutPlayer(id, player);
            return Ok(player);
        }

        // POST: api/Players
        [HttpPost]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> PostPlayer([FromBody] Player player)
        {
            await _context.player.Add(player);

            return Ok(player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> DeletePlayer([FromRoute] int id)
        {
            var player = await _context.player.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }

            _context.player.Remove(player);

            return Ok(player);
        }
    }
}