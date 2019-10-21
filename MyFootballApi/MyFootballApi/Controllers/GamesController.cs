using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFootballApi.Models;

namespace MyFootballApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly MyFootballContext _context;

        public GamesController(MyFootballContext context)
        {
            _context = context;
        }

        // GET: api/Games
        [Route("~/api/Games")]
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<Game> GetGames()
        {
            return _context.game.GetGames();
            //return _context.Players;
        }

        // GET: api/Games/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var game = await _context.game.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        // PUT: api/Games/5
        [HttpPut("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> PutGame([FromRoute] int id, [FromBody] Game game)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gameToPut = await _context.game.FindAsync(id);

            if (gameToPut == null)
            {
                return NotFound();
            }

            _context.game.PutGame(id, game);

            return Ok(game);
        }

        // POST: api/Games
        [HttpPost]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> PostGame([FromBody] Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //await
            _context.game.Add(game);

            return CreatedAtAction("GetGame", new { id = game.id }, game);
        }

        // DELETE: api/Games/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "administrator")]
        public async Task<IActionResult> DeleteGame([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var game = await _context.game.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.game.Remove(game);

            return Ok(game);
        }

    }
}
