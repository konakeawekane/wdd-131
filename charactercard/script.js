let name = document.getElementById("name");
let className = document.getElementById("class");
let level = document.getElementById("level");
let health = document.getElementById("health");
let image = document.getElementById("profile");

let character = {
    name:"Cookie Monster",
    class:"Destroyer of Cookies",
    level:1,
    health:100,
    imgPath:"images/cookieMonster-og.png",
    imgAlt:"cookie monster",
    Attack: function(damage = 0){
        let newHealth = this.health - damage;
        this.health = Math.round(newHealth);
        if(newHealth < 0){
            this.health = 0;
            alert("Character has died.");
        }
        this.RefreshData();
    },
    LevelUp: function(levels = 0){
        this.level += Math.round(levels);
        this.RefreshData();
    },
    RefreshData: function(){
        name.textContent = this.name;
        className.textContent = this.class;
        level.textContent = this.level;
        health.textContent = this.health;
        image.setAttribute("img", this.imgPath);
        image.setAttribute("alt", this.imgAlt);
    }
}

let attackButton = document.getElementById("attack");
let leveUpButton = document.getElementById("levelup");

attackButton.addEventListener("click", e =>{
    character.Attack(20);
})

leveUpButton.addEventListener("click", e =>{
    character.LevelUp(1);
})

character.RefreshData();