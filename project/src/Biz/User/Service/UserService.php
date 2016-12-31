<?php

namespace Biz\User\Service;

interface UserService
{
    public function getUser($userID);
    public function findUsers();
    public function modifyUser($params);
    public function delUser($userID);
    public function addUser($params);
}
