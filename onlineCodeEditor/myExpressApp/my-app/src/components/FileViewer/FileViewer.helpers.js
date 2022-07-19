export function getFile(files, testFn) {
    let items = [...files];
    while (items.length) {
      let item = items.shift();
      if (item.type === 'file') {
        const matches = testFn(item);
        if (matches) {
          return item;
        }
      }
      if (item.type === 'directory') {
        items.push(...item.contents);
      }
    }
  }
  export function openFile(items, fileSlugToOpen, slugPrefix = '') {
    
    items.forEach((item) => {
      const slug = `${slugPrefix}/${item.name}`;
      console.log("Item",item.name,item.type,item.isExpanded)
      if (item.type === 'file') {
        item.isSelected = fileSlugToOpen === slug;
      } else {        
        openFile(item.contents, fileSlugToOpen, slug);
      }
    });
  }