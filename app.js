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
      {
        id: 0,
        participantName: "Ajay",
        activityName: "Running",
        time: 45,
        calories: 300
      },
      {
        id: 0,
        participantName: "Ajay",
        activityName: "Swimming",
        time: 15,
        calories: 100
      },
      {
        id: 0,
        participantName: "Ajay",
        activityName: "Cycling",
        time: 35,
        calories: 400
      }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    logData: function() {
      return data;
    }
  };
})();

//UI Contoller
const UICtrl = (function() {
    const UICtrl = {
        itemList: '#item-list'
    }
  // Public methods
  return {
    populateItemList: function(items) {
        let html = '';
          items.forEach(item => {
              html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.participantName} - </strong> <strong>${item.activityName}</strong>
                <strong>${item.time} Mins</strong>
                <em>${item.calories} Calories</em>
                <a href="" class="edit-item secondary-content"><i class="fas fa-edit"></i></a>
            </li>`
        });
        document.querySelector(UICtrl.itemList).innerHTML = html;

    }
  };
})();

// APP controller

const App = (function(ItemCtrl, UICtrl) {
  return {
    init: function() {
      // Fetch items from State/Data Data Structure
      const items = ItemCtrl.getItems();
      UICtrl.populateItemList(items);
    }
  };
})(ItemCtrl, UICtrl);

App.init();
