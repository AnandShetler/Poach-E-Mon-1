#pragma strict

var player : GameObject;
var mainScript : Main1;
var parsed : String[];

function Start () {
	player = GameObject.Find("Player");
	Load();
}

function Awake () {
	mainScript = gameObject.Find("Main").GetComponent(Main1);
}

function Load () {
	if (PlayerPrefs.HasKey("playerX")) {
		player.transform.position.x = (PlayerPrefs.GetFloat("playerX"));
		player.transform.position.y = (PlayerPrefs.GetFloat("playerY"));
		player.transform.position.z = (PlayerPrefs.GetFloat("playerZ"));

		player.setCurHp(PlayerPrefs.GetFloat("curHp"));
		player.curAtk = (PlayerPrefs.GetFloat("curAtk"));
		player.curDef = (PlayerPrefs.GetFloat("curDef"));
		player.curSpd = (PlayerPrefs.GetFloat("curSpd"));
	}
	else {
		player.transform.position.x = -8.0;
		player.transform.position.y = -55.0;
		player.transform.position.z = 75.0;
	}
	if (PlayerPrefs.HasKey("monsters")) {
		mainScript.monsterCount = PlayerPrefs.GetInt("monsterCount");
		Debug.Log(PlayerPrefs.GetString("monsters"));
		parsed = PlayerPrefs.GetString("monsters").Split(" "[0]);
		for (var i = 0; i < mainScript.monsterCount; i++) {
			mainScript.monsterInventory[i] = mainScript.copyMonster(parsed[i*2]);
			Debug.Log(mainScript.monsterInventory[i].curHp);
			mainScript.monsterInventory[i].curHp = int.Parse(parsed[i*2+1]);
		}
	}
	else {
		mainScript.monsterCount = 1;
		mainScript.monsterInventory[0] = mainScript.copyMonster("Coyote");
	}
}

function Display () {
	for (var i = 0; i < mainScript.monsterCount; i++){
		GUI.Label(Rect(170,100+(i*20),200,100),""+mainScript.monsterInventory[i].name);
	}
}


function Save () {
	PlayerPrefs.SetFloat("playerX",player.transform.position.x);
	PlayerPrefs.SetFloat("playerY",player.transform.position.y);
	PlayerPrefs.SetFloat("playerZ",player.transform.position.z);

	PlayerPrefs.SetFloat("curHp",player.curHp);
	PlayerPrefs.SetFloat("curAtk",player.curAtk);
	PlayerPrefs.SetFloat("curDef",player.curDef);
	PlayerPrefs.SetFloat("curSpd",player.curSpd);

	PlayerPrefs.SetInt("monsterCount",mainScript.monsterCount);

	var monsters = "";
	for (var i = 0; i < mainScript.monsterCount-1; i++) {
		var m = mainScript.monsterInventory[i];
		monsters += m.name + " " + m.curHp + " " + m.isHealing + " " + m.curAtk + " " + m.curDef + " " + m.curSpd + " ";
	}
	var m = mainScript.monsterInventory[mainScript.monsterCount-1];
	monsters += m.name + " " + m.curHp + " " + m.isHealing + " " + m.curAtk + " " + m.curDef + " " + m.curSpd;
	PlayerPrefs.SetString("monsters", monsters);
}
