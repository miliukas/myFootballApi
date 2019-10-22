using System;
using Xunit;
using MyFootballApi.Controllers;
using MyFootballApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace Tests
{
    public class PlayersControlerTest
    {
        private readonly MyFootballContext context = new MyFootballContext();
        [Fact]
        public async void Task_GetPlayerById_Return_OkResult()
        {
            //Arrange  
            var controller = new PlayersController(context);
            var playerId = 2;

            //Act  
            var data = await controller.GetPlayer(playerId);

            //Assert  
            Assert.IsType<OkObjectResult>(data);
        }

        [Fact]
        public async void Task_GetPlayerById_Return_NotFoundResult()
        {
            //Arrange  
            var controller = new PlayersController(context);
            var playerId = 100;

            //Act  
            var data = await controller.GetPlayer(playerId);

            //Assert  
            Assert.IsType<NotFoundResult>(data);
        }
    }
}
