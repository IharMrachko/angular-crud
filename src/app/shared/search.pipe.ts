import {Pipe, PipeTransform} from '@angular/core';
import {UserProfile} from './interfasec';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform{
  transform(userProfile: UserProfile[], search = ''): UserProfile[] {
    if (!search.trim()) {
      return  userProfile;
    }

    return userProfile.filter(usProfile => {
      return usProfile.name.toLowerCase().includes(search.toLowerCase());
    })
  }

}
