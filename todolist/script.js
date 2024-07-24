document.addEventListener("DOMContentLoaded", function() {
  // Sayfa yüklendiğinde local storage'dan öğeleri yükle
  loadTasks();

  // Yeni bir liste elemanı eklemek için fonksiyon
  function newElement() {
      var task = document.getElementById("task").value.trim();
      
      if (task === "") {
          showToast("error");
          return;
      }

      var li = document.createElement("li");
      var t = document.createTextNode(task);
      li.appendChild(t);
      
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      document.getElementById("list").appendChild(li);

      // Görevleri local storage'a kaydet
      saveTasks();

      document.getElementById("task").value = "";

      li.querySelector(".close").onclick = function() {
          var div = this.parentElement;
          div.style.display = "none";
          saveTasks();
      };

      li.addEventListener('click', function() {
          li.classList.toggle('checked');
          saveTasks();
      });

      showToast("success");
  }

  // Toast bildirimi göstermek için fonksiyon
  function showToast(type) {
      var toastID = type === "success" ? "liveToast" : "liveToast2";
      var toastElement = document.getElementById(toastID);
      if (toastElement) {
          var bootstrapToast = new bootstrap.Toast(toastElement);
          bootstrapToast.show();
      } else {
          console.error("Toast element not found:", toastID);
      }
  }

  // Local storage'dan görevleri yüklemek için fonksiyon
  function loadTasks() {
      var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(function(task) {
          var li = document.createElement("li");
          var t = document.createTextNode(task.text);
          li.appendChild(t);
          if (task.checked) {
              li.classList.add('checked');
          }

          var span = document.createElement("SPAN");
          var txt = document.createTextNode("\u00D7");
          span.className = "close";
          span.appendChild(txt);
          li.appendChild(span);

          document.getElementById("list").appendChild(li);

          span.onclick = function() {
              var div = this.parentElement;
              div.style.display = "none";
              saveTasks();
          };

          li.addEventListener('click', function() {
              li.classList.toggle('checked');
              saveTasks();
          });
      });
  }

  // Görevleri local storage'a kaydetmek için fonksiyon
  function saveTasks() {
      var tasks = [];
      var items = document.getElementById("list").getElementsByTagName("li");
      for (var i = 0; i < items.length; i++) {
          var item = items[i];
          tasks.push({
              text: item.childNodes[0].nodeValue,
              checked: item.classList.contains('checked')
          });
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Ekle butonuna tıklama olayını bağlama
  document.getElementById("liveToastBtn").addEventListener("click", newElement);
});
