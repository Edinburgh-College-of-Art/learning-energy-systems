<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * AppQuestion Entity.
 *
 * @property int $id
 * @property int $app_school_id
 * @property \App\Model\Entity\AppSchool $app_school
 * @property string $question
 * @property string $answer
 */
class AppQuestion extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
        'id' => false,
    ];
}
