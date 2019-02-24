//  Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, pName, activityName, time, calories) {
    this.id = id;
    this.participantName = pName;
    this.activityName = activityName;
    this.time = time;
    this.calories = calories;
  };

  // Data Structure /State
  const data = {
    items: [
      // {
      //   id: 0,
      //   participantName: "Ajay",
      //   activityName: "Running",
      //   time: 45,
      //   calories: 300
      // },
      // {
      //   id: 0,
      //   participantName: "Ajay",
      //   activityName: "Swimming",
      //   time: 15,
      //   calories: 100
      // },
      // {
      //   id: 0,
      //   participantName: "Ajay",
      //   activityName: "Cycling",
      //   time: 35,
      //   calories: 400
      // }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(pName, activityName, activityTime, activityCalories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Parse calories and time into number
      activity_time = parseInt(activityTime);
      activity_calories = parseInt(activityCalories);

      // Create new item
      newItem = new Item(
        ID,
        pName,
        activityName,
        activity_time,
        activity_calories
      );

      // Add item to Items array
      data.items.push(newItem);
      return newItem;
    },
    
    getItemById: function(id){
      let found = null;

      // Loop through items
      data.items.forEach(function(item){
        if (item.id === id){
          found = item;
        }
      })
      return found;
    },
    updateItem: function(participantName, activityName, activityTime, activityCalories){
      activityTime = parseInt(activityTime);
      activityCalories = parseInt(activityCalories);
      // Loop through items
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.participantName = participantName;
          item.activityName = activityName;
          item.time = activityTime;
          item.calories = activityCalories;
          found = item;
        }
      })
      return found;
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;
      data.items.forEach(function(item) {
        total += item.calories;
      });
      // Set total calories in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },

    logData: function() {
      return data;
    }
  };
})();

//UI Contoller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    participantName: "#participant-name",
    activityName: "#activity-name",
    activityTime: "#activity-time",
    activityCalories: "#activity-calories",
    totalCalories: ".total-calories"
  };
  // Public methods
  return {
    populateItemList: function(items) {
      let html = "";
      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.participantName} - </strong> <strong>${
          item.activityName
        }</strong>
                <strong>${item.time} Mins</strong>
                <em>${item.calories} Calories</em>
                <a href="" class="edit-item secondary-content"><i class="fas fa-edit"></i></a>
            </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function() {
      return {
        participantName: document.querySelector(UISelectors.participantName)
          .value,
        activityName: document.querySelector(UISelectors.activityName).value,
        activityTime: document.querySelector(UISelectors.activityTime).value,
        activityCalories: document.querySelector(UISelectors.activityCalories)
          .value
      };
    },
    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li item
      const li = document.createElement("li");

      // Add class
      li.className = "collection-item";

      // Add ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `<strong>${item.participantName} - </strong>
      <strong>${item.activityName}</strong>
      <strong>${item.time} Mins</strong>
      <em>${item.calories} Calories</em>
      <a href="" class="secondary-content"><i class="edit-item fas fa-edit"></i></a>`;

      //Inset item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    updatListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn nodeList to array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.participantName} - </strong>
          <strong>${item.activityName}</strong>
          <strong>${item.time} Mins</strong>
          <em>${item.calories} Calories</em>
          <a href="" class="secondary-content"><i class="edit-item fas fa-edit"></i></a>`;
        }
      })
    },

    // Hide itemlist if no item present
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    // Show total calories
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },

    // Clear Edit State
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display='none';
      document.querySelector(UISelectors.deleteBtn).style.display='none';
      document.querySelector(UISelectors.backBtn).style.display='none';
      document.querySelector(UISelectors.addBtn).style.display='inline';
    },

    // Clear input fields
    clearInput: function() {
      document.querySelector(UISelectors.participantName).value = "";
      document.querySelector(UISelectors.activityName).value = "";
      document.querySelector(UISelectors.activityTime).value = "";
      document.querySelector(UISelectors.activityCalories).value = "";
    },

    addItemToForm: function() {
      document.querySelector(UISelectors.participantName).value = ItemCtrl.getCurrentItem().participantName;
      document.querySelector(UISelectors.activityName).value = ItemCtrl.getCurrentItem().activityName;
      document.querySelector(UISelectors.activityTime).value = ItemCtrl.getCurrentItem().time;
      document.querySelector(UISelectors.activityCalories).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display='inline';
      document.querySelector(UISelectors.deleteBtn).style.display='inline';
      document.querySelector(UISelectors.backBtn).style.display='inline';
      document.querySelector(UISelectors.addBtn).style.display='none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// APP controller

const App = (function(ItemCtrl, UICtrl) {
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event listener
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Disable submit on Enter
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event listener
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event listener
    // document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back btn event listener
    // document.querySelector(UISelectors.backBtn).addEventListener('click', );
  };
  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    if (
      input.participantName !== "" &&
      input.activityName !== "" &&
      input.activityTime !== NaN &&
      input.calories !== NaN
    ) {
      const newItem = ItemCtrl.addItem(
        input.participantName,
        input.activityName,
        input.activityTime,
        input.activityCalories
      );

      //Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total caloroies to UI
      UICtrl.showTotalCalories(totalCalories);
      // Clear the input
      UICtrl.clearInput();
    }

    e.preventDefault();
  }
  
  //Click edit item
  const itemEditClick = function(e){
    console.log('clicked');
    if(e.target.classList.contains('edit-item')){
      //Get list item id (item-0)
      const listId = e.target.parentNode.parentNode.id;
      
      //Break editItem into array
      const listIdArr = listId.split('-');
      
      //Get the actual id
      const id = parseInt(listIdArr[1]);
      
      //Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      //Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }
    const itemUpdateSubmit = function(e){

      //Get item input
      const input = UICtrl.getItemInput();

      //Update item
      const updatedItem = ItemCtrl.updateItem(input.participantName, input.activityName, input.activityTime, input.activityCalories);

      //Update UI
      UICtrl.updatListItem(updatedItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total caloroies to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear Edit State

      UICtrl.clearEditState();

      e.preventDefault();
    };

  return {
    init: function() {

      // Clear Edit State
      UICtrl.clearEditState();
      // Fetch items from State/Data Data Structure
      const items = ItemCtrl.getItems();

      // Check if any items otherwise hide list
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

App.init();
