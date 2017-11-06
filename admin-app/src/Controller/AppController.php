<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');

use Cake\Controller\Controller;
use \Cake\Event\Event as Event;
use Cake\ORM\TableRegistry;
use Cake\Network\Exception\UnauthorizedException;

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link http://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AppController extends \Cake\Controller\Controller
{
   
   public $components =
    [
        'RequestHandler'
    ];

    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading components.
     *
     * @return void
     */
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Flash');
    }

    protected function authorize($request, $studentId) {
        $this->AppStudents = TableRegistry::get('AppStudents');
        $studentSecret = $this->AppStudents->get($studentId)->secret;
        $tokenLine = $request->header('Authorization');
        $token = str_replace("Bearer ","",$tokenLine);
        
        if (array_key_exists('request_ts', $request->data)) { 
            $result = hash('sha1', $request->data['request_ts'] . $studentSecret); 
        } else {
            $result = rand();
        }

        if ($result == $token){
            return true; 
        } else {
            throw new UnauthorizedException(__('You are not authorized to perform this action'));
        }
    }

}