import React from 'react';
import Safe from 'react-safe';

const InitialiseTheme = () => {

  const noflash = `(function() { try {
    var mode = localStorage.getItem('theme');
    if (!mode) return
    document.body.classList.add(mode + '-theme');
  } catch (e) {} })();`

  return (
    <Safe.script>
      {noflash}
    </Safe.script>
  )
}

export default InitialiseTheme