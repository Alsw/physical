<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BaseController extends Controller
{

    public function getBiz()
    {
        return $this->container->get('biz');
    }
}
