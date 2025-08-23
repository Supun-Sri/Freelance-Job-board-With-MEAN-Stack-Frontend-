import { Routes } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';
import { Signuppage } from './signuppage/signuppage';
import { Searchpage } from './searchpage/searchpage';
import { Frontpage } from './frontpage/frontpage';
import { Buypage } from './buypage/buypage';
import { Jobcreation } from './jobcreation/jobcreation';
import { Gigpage } from './gigpage/gigpage';
import { Freelancerprofile } from './freelancerprofile/freelancerprofile';
import { Buyerprofile } from './buyerprofile/buyerprofile';
import { myguardGuard } from './guards/myguard-guard';

export const routes: Routes = [

    {
        path: '',
        component: Frontpage,
        pathMatch: 'full'
    },

    { 
        path: 'login',
        component: Loginpage

    },
    { 
        path: 'signup',
        component: Signuppage

    },
    { 
        path: 'search',
        component: Searchpage

    },
    { 
        path: 'front',
        component: Frontpage

    },
    { 
        path: 'buy/:id',
        component: Buypage,
        canActivate: [myguardGuard]

    },
    { 
        path: 'jobcreation',
        component: Jobcreation,
        canActivate: [myguardGuard]

    },
    { 
        path: 'gig/:id',
        component: Gigpage

    },
    {
        path: 'freelancerprofile',
        component: Freelancerprofile,
        canActivate: [myguardGuard]
    },
    {
        path: 'buyerprofile',
        component: Buyerprofile,
        canActivate: [myguardGuard]
    },
    { 
        path: '**',
        redirectTo: '/front',
        pathMatch: 'full'
    }


];