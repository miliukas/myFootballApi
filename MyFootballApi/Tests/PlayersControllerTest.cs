using System;
using Xunit;
using MyFootballApi.Controllers;
using MyFootballApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Tests
{
    public class PlayersControllerTest
    {
        private readonly MyFootballContext context = new MyFootballContext();


        [Theory]
        [InlineData(1, true)]
        [InlineData(3, false)]
        [InlineData(7, true)]
        public void Task_CheckDoesPlayerExist(int value1, bool expected)
        {
            //Arrange  

            //Act  
            var result = context.player.Exist(value1);

            //Assert  
            Assert.Equal(expected, result);
        }

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

        [Fact]
        public void Task_GetPlayers()
        {
            //Arrange  
            var controller = new PlayersController(context);


            //Act  
            var data = controller.GetPlayers();

            //Assert
            Assert.NotEmpty(data);
        }

        [Fact]
        public async void Task_PostValidPlayer_Return_OkResult()
        {
            //Arrange  
            var controller = new PlayersController(context);
            var player = PlayerToTest();

            //Act  
            var data = await controller.PostPlayer(player);
            

            //Assert  
            Assert.IsType<OkObjectResult>(data);
            RemoveAddedPlayerFromDb();
        }

        [Fact]
        public async void Task_PutValidPlayer_Return_OkResult()
        {
            //Arrange  
            var controller = new PlayersController(context);
            var player = PlayerToTestPut();
            var id = 4;

            //Act  
            var data = await controller.PutPlayer(id,player);
            //Assert  
            Assert.IsType<OkObjectResult>(data);
        }

        [Fact]
        public async void Task_PutNotValidPlayer_Return_NotFoundObjectResult()
        {
            //Arrange  
            var controller = new PlayersController(context);
            var player = PlayerToTestPut();
            var id = 3;

            //Act  
            var data = await controller.PutPlayer(id, player);
            //Assert  
            Assert.IsType<NotFoundObjectResult>(data);
        }

        [Fact]
        public async void Task_DeleteExistingPlayer_Return_OkResult()
        {
            //Arrange  
            var controller = new PlayersController(context);
            var player = PlayerToTest();
            await controller.PostPlayer(player);
            var id = context.player.MaxId();

            //Act  
            var data = await controller.DeletePlayer(id);


            //Assert  
            Assert.IsType<OkObjectResult>(data);
        }

        [Fact]
        public async void Task_DeleteNotExistingPlayer_Return_NotFoundResult()
        {
            //Arrange  
            var controller = new PlayersController(context);
            var id = 3;

            //Act  
            var data = await controller.DeletePlayer(id);


            //Assert  
            Assert.IsType<NotFoundResult>(data);
        }

        private Player PlayerToTest()
        {
            return new Player("testName", "testLastName", DateTime.Now, 1, "testPossition", "testNationality",
                20.0, 1.24, 100, 0, "testLeague", "2012", 1);
        }

        private Player PlayerToTestPut()
        {
            return new Player("PUT", "PUT testas", DateTime.Now, 1, "testPossition", "testNationality",
                20.0, 1.24, 100, 0, "testLeague", "2012", 1);
        }

        private void RemoveAddedPlayerFromDb()
        {
            context.player.RemoveLastPlayer();
        }

    }
}
