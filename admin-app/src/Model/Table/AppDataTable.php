<?php
namespace App\Model\Table;

use App\Model\Entity\AppData;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AppData Model
 *
 * @property \Cake\ORM\Association\BelongsTo $AppStudentsUniques
 */
class AppDataTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('app_data');
        $this->displayField('id');
        $this->primaryKey('id');

        $this->belongsTo('AppStudents', [
            'foreignKey' => 'app_students_unique_id',
            'className' => 'AppStudents'
            ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->allowEmpty('id', 'create')
            ->add('id', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

        $validator
            ->requirePresence('subject', 'create')
            ->notEmpty('subject');

        $validator
            ->add('light', 'valid', ['rule' => 'numeric'])
            ->requirePresence('light', 'create')
            ->notEmpty('light');

        $validator
            ->add('computer', 'valid', ['rule' => 'numeric'])
            ->requirePresence('computer', 'create')
            ->notEmpty('computer');

        $validator
            ->add('heater', 'valid', ['rule' => 'numeric'])
            ->requirePresence('heater', 'create')
            ->notEmpty('heater');

        $validator
            ->add('projector', 'valid', ['rule' => 'numeric'])
            ->requirePresence('projector', 'create')
            ->notEmpty('projector');

        $validator
            ->requirePresence('lightString', 'create')
            ->notEmpty('lightString');

        $validator
            ->requirePresence('computerString', 'create')
            ->notEmpty('computerString');

        $validator
            ->requirePresence('heaterString', 'create')
            ->notEmpty('heaterString');

        $validator
            ->requirePresence('projectorString', 'create')
            ->notEmpty('projectorString');

        $validator
            ->add('date', 'valid', ['rule' => 'date'])
            ->requirePresence('date', 'create')
            ->notEmpty('date');

        $validator
            ->requirePresence('time_inserted', 'create')
            ->notEmpty('time_inserted');

        return $validator;
    }
}
