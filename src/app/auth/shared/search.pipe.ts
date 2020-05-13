import {Pipe, PipeTransform} from '@angular/core';
import {UserProfile} from '../../shared/interfasec';

@Pipe({
  name: 'searchStrAuth'
})
export class SearchPipeAuth implements PipeTransform{
  transform(userProfile: UserProfile[], search = ''): UserProfile[] {
    if (!search.trim()) {
      return  userProfile;
    }

    return userProfile.filter(usProfile => {
      return usProfile.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
