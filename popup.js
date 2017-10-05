var nextPage = angular.module('nextPage', []);
nextPage.controller('goToProperPage', ['$scope','$http', function($scope,$http) {  
    
    $scope. goToEasyVocabularyPage = function()
    {
       /*
            $http({
                url : 'http://localhost:8080/my-vocabulary/api/words',
                method : 'GET',
                contentType: 'application/json'
                
            }).then(function success(response) {
                var products = response.data;
                var bkg = chrome.extension.getBackgroundPage();  
                
                for(i=0; i<products.length; i++)
                    {
                bkg.console.log(products[i]);
                    }
                
                 alert('Data saved: '+products[0].engWord);
                
            }, function error(response) {
                 alert('Data not saved ');
            });
        */
        
        var newURL  = "http://localhost:8080/my-vocabulary/easy_words";
        chrome.tabs.create({ url: newURL });
        
    }
    
    $scope. goToMediumVocabularyPage = function()
    {
        var newURL  = "http://localhost:8080/my-vocabulary/medium_words";
        chrome.tabs.create({ url: newURL });
    }
    
    $scope. goToHeightVocabularyPage = function()
    {
        var newURL  = "http://localhost:8080/my-vocabulary/height_words";
        chrome.tabs.create({ url: newURL });
    }

}]); 


var app = angular.module('myApp', []);
app.controller('addDataToDataBase', ['$scope','$http', function($scope,$http) {      
 
   
    
    
    $scope.addWordToVocabulary = function ()
    {

        //Pobiera dane wprowadzone przez użytkownika
        var word = getDataFromFields();

        var bkg = chrome.extension.getBackgroundPage();  
        bkg.console.log('aaaaaaa: '+word.showWordParameters());
        
        var wordJSON = JSON.stringify(word);
        bkg.console.log('wordJSON: '+wordJSON);

      
        
        $http({
            url : 'http://localhost:8080/my-vocabulary/api/words',
            method : 'POST',
            contentType: 'application/json',
            data : wordJSON
        }).then(function success(response) {
           
            var bkg = chrome.extension.getBackgroundPage(); 
            bkg.console.log('response.data: '+response.data);
            
            alert('Data saved: '+response)
            
        }, function error(response) {
            
            var bkg = chrome.extension.getBackgroundPage(); 
            bkg.console.log(response.error);
            
            alert('Data not saved '+response);
        });
        
           
    }


    function getDataFromFields()
    {
       var eng_word = document.getElementById("eng_word").value; 
       var pl_word = document.getElementById("pl_word").value; 
       var difficulty_level = getRadioValue('difficulty_level');

       var word = new Word(eng_word,pl_word,difficulty_level);    

       return word;
    }


    function getRadioValue(theRadioGroup)
    {
        var elements = document.getElementsByName(theRadioGroup);
        for (var i = 0, l = elements.length; i < l; i++)
        {
            if (elements[i].checked)
            {
                return elements[i].value;
            }
        }
    }

    
    chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    }, function(selection) {
      document.getElementById("eng_word").value = selection[0];
    });
    

    
    
}]);

angular.bootstrap(document.getElementById("App2"), ['myApp']);


function Word(engWord, plWord,difficultyLevel)
{
    this.engWord = engWord;
    this.plWord = plWord;
    this.difficultyLevel = difficultyLevel;
    
    this.setWordParameters = function(engWord, plWord, difficultyLevel)
	{
	    this.engWord = engWord;
        this.plWord = plWord;
        this.difficultyLevel = difficultyLevel;
	}
    
    this.showWordParameters = function()
    {
        return 'Object: [english word: '+engWord+', polish word: '+plWord+', difficulty level: ' + difficultyLevel+ ']';
    }
}


/*
function Word(eng_word, pl_word,difficulty_level)
{
    this.eng_word = eng_word;
    this.pl_word = pl_word;
    this.difficulty_level = difficulty_level;
    
    this.setWordParameters = function(eng_word, pl_word, difficulty_level)
	{
	    this.eng_word = eng_word;
        this.pl_word = pl_word;
        this.difficulty_level = difficulty_level;
	}
    
    this.showWordParameters = function()
    {
        return 'Object: [english word: '+eng_word+', polish word: '+pl_word+', difficulty level: ' + difficulty_level+ ']';
    }
}
*/




/*
document.getElementById('clickme').addEventListener('click', addWordToVocabulary);

function addWordToVocabulary()
{
    
    //Pobiera dane wprowadzone przez użytkownika
    var word = getDataFromFields();
    
    var bkg = chrome.extension.getBackgroundPage();  
    bkg.console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
    bkg.console.log(word.showWordParameters(word.showWordParameters));
    bkg.console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
    
    
    
     $http({
            method : 'POST',
            url : 'api/products',
            data : word
        }).then(function success(response) {
             bkg.console.log('przesylanie dziala')
        }, function error(response) {
            bkg.console.log('Data not saved ');
        });
    }
    
    
    
}


function getDataFromFields()
{
   
   
   
   var eng_word = document.getElementById("eng_word").value; 
   var pl_word = document.getElementById("pl_word").value; 
   var difficulty_level = getRadioValue('difficulty_level');

       
   var word = new Word(eng_word,pl_word,difficulty_level);    

   return word;
  
}


function getRadioValue(theRadioGroup)
{
    var elements = document.getElementsByName(theRadioGroup);
    for (var i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            return elements[i].value;
        }
    }
}


function Word(eng_word, pl_word,difficulty_level)
{
    this.eng_word = eng_word;
    this.pl_word = pl_word;
    this.difficulty_level = difficulty_level;
    
    this.setWordParameters = function(eng_word, pl_word, difficulty_level)
	{
	    this.eng_word = eng_word;
        this.pl_word = pl_word;
        this.difficulty_level = difficulty_level;
	}
    
    this.showWordParameters = function()
    {
        return 'Object: [english word: '+eng_word+', polish word: '+pl_word+', difficulty level: ' + difficulty_level+ ']';
    }
}

document.getElementById('clickEasy').addEventListener('click', goToEasyVocabularyPage);

function goToEasyVocabularyPage()
{
     var newURL  = 'http://www.google.com/search?q=' + 'Easy';
     chrome.tabs.create({ url: newURL });
     
     var bkg = chrome.extension.getBackgroundPage();
     bkg.console.log('Easy');
}

document.getElementById('clickMedium').addEventListener('click', goToMediumVocabularyPage);

function goToMediumVocabularyPage()
{
     var newURL  = 'http://www.google.com/search?q=' + 'Medium';
     chrome.tabs.create({ url: newURL }); 
    
     var bkg = chrome.extension.getBackgroundPage();
     bkg.console.log('Medium');
}

document.getElementById('clickHeight').addEventListener('click', goToHeightVocabularyPage);

function goToHeightVocabularyPage()
{   
     var newURL  = 'http://www.google.com/search?q=' + 'Height';
     chrome.tabs.create({ url: newURL }); 
    
     var bkg = chrome.extension.getBackgroundPage();
     bkg.console.log('Height');
}


chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    }, function(selection) {
      document.getElementById("eng_word").value = selection[0];
    });
*/
