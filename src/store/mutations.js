export default {
  addTag(state, tag) {
    var tags = state.tags;
    var flag = true;
    for (var i = 0, len = tags.length; i < len; i++) {
    	//已存在tag
      if (tags[i]['path'] == tag['path']) {
        flag = false;
        tags[i]['active'] = true;
      }else {
      	tags[i]['active'] = false;
      }
    }
    if (flag) {
      state.tags.push(tag);
    }

  },
  removeTag(state, tagname) {
    var tags = state.tags;
    var next = 0;
    for (var i = 0, len = tags.length; i < len; i++) {
      if (tags[i]['path'] == tagname) {

      	// 如果删除的是当前的 换一个
      	if(tags[i]['active']){
      		if(i == 0){
      			next = len - 1;
      		}else if(i > 0){
      			next = i - 1;
      		}
      		state.tags[next].active = true;

      	}
        state.tags.splice(i, 1);

        break;
      }
    }
  }
}
