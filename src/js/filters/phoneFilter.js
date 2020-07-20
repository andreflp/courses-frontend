app.filter('phone', function(){
    return function(input) {
      var number = input || '';
      number = number.trim().replace(/[-\s\(\)]/g, '');
      
      if(number.length === 11) {
        var area = ['(', number.substr(0,2) ,')'].join('');
        
        var local = [number.substr(2, 5), number.substr(6, 4)].join('-');
        
        return [area,local].join(' ')
      }
      
      if(number.length === 9) {
        var local = [number.substr(0, 5), number.substr(5, 4)].join('-');
        
        return local
      }
      
      if(number.length === 8) {
        var local = [number.substr(0, 4), number.substr(4, 4)].join('-');
        
        return local
      }
      
      return number;
    };
  });