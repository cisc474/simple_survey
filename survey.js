$(document).ready(function(){
 
  var push_data = function(){
      var thename = $("#name").val();
      if (parseInt($("#g_remaining_points")) > 0){
          alert("Please use all 10 goal points");
          return;
      }
      var mydata = {
              name: thename,
              b_db: $("#bdb").val(),
              b_script: $("#bscripting").val(),
              b_js: $("#bjs").val(),
              b_html: $("#bhtml").val(),
              b_css: $("#bcss").val(),
              b_ux: $("#bux").val(),
              g_db: $("#gdb").val(),
              g_script: $("#gscripting").val(),
              g_js: $("#gjs").val(),
              g_html: $("#ghtml").val(),
              g_css: $("#gcss").val(),
              g_ux: $("#gux").val() };
      $("body").html("Hold on for one second "+ thename +"while I save the data...");
      $.ajax({
          type : "POST",
          url : "api/results",
          data : JSON.stringify(mydata),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(){ $("body").html("Thanks for taking my survey, "+thename);},
          error: function(errMsg){$("body").html("disaster struck");}
          });
  }

  var start_app = function(thename){
      $(".name").html(thename);
      $("#remaining_points").html(30);
      $(".survey").removeClass("hidden");
       
      var update_points = function(){
          var points = 0;
          $(".survey input[type=number]").each(function(index){
              points += parseInt($(this).val());
          });
          if (points == 30){
              $(".points").addClass("none");
          } else if (points < 30){
              $(".points").removeClass("none");
          }
          if (points > 30){
              alert("You are over 30 points, please fix before moving on");
          }
          $("#remaining_points").html(30 - points);
      }

      $(".survey input[type=number]").change(update_points);

      $("#next").click(function(){
          $("#g_remaining_points").html(10);
          $(".goals").removeClass("hidden");
      });

      var update_g_points = function(){
          var points = 0;
          $(".goals input[type=number]").each(function(index){
              points += parseInt($(this).val());
          });
          if (points == 10){
              $(".g_points").addClass("none");
          } else if (points < 10){
              $(".g_points").removeClass("none");
          }
          if (points > 10){
              alert("You are over 10 goal points, please fix before moving on");
          }
          $("#g_remaining_points").html(10 - points);
      }

      $(".goals input[type=number]").change(update_g_points);
      
      $("#save").click(push_data);
  };

  var reset_app = function(){
      $("#name").html("");
      $(".name").html("student");
      $(".survey").addClass("hidden");
      $(".goals").addClass("hidden");
      $("input[type=number]").val(0);
      $(".none").removeClass("none");
      $("#remaining_points").html(30);
      $("#g_remaining_points").html(10);
  };

  console.log("started up");
  $("#name").blur(function(){
      console.log("blurred name");
      var thename = $("#name").val();
      if (thename){
          start_app(thename);
      } else {
          reset_app();
      }
  });
});
